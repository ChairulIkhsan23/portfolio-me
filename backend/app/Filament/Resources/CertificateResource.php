<?php

namespace App\Filament\Resources;

use App\Enums\CertificateCategory;
use App\Enums\Skill;
use App\Filament\Resources\CertificateResource\Pages;
use App\Models\Certificate;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class CertificateResource extends Resource
{
    protected static ?string $model = Certificate::class;

    protected static ?string $navigationIcon = 'heroicon-o-identification';

    protected static ?string $navigationLabel = 'Certificates';

    protected static ?string $navigationGroup = 'Content';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // Section 1: Basic Information
                Section::make('Basic Information')
                    ->icon('heroicon-o-information-circle')
                    ->description('Enter the basic details of your certificate')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('title')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('e.g., Laravel Certification')
                                    ->columnSpanFull(),
                                
                                TextInput::make('issuer')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('e.g., Laravel Academy, Dicoding, Coursera'),
                                
                                TextInput::make('issuer_logo')
                                    ->maxLength(255)
                                    ->placeholder('URL or path to issuer logo'),
                            ]),
                    ]),
                
                // Section 2: Credential Details
                Section::make('Credential Details')
                    ->icon('heroicon-o-document-text')
                    ->description('Credential ID and verification URL')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('credential_id')
                                    ->maxLength(255)
                                    ->placeholder('e.g., CERT-12345'),
                                
                                TextInput::make('credential_url')
                                    ->maxLength(255)
                                    ->placeholder('https://verify.example.com/cert/12345'),
                            ]),
                    ]),
                
                // Section 3: Media
                Section::make('Certificate Media')
                    ->icon('heroicon-o-photo')
                    ->description('Upload certificate image and related media')
                    ->schema([
                        FileUpload::make('image')
                            ->image()
                            ->directory('certificates')
                            ->imagePreviewHeight('200')
                            ->loadingIndicatorPosition('left')
                            ->maxSize(2048),
                    ]),
                
                // Section 4: Dates
                Section::make('Validity Period')
                    ->icon('heroicon-o-calendar')
                    ->description('When you received this certificate and its validity')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                DatePicker::make('issued_date')
                                    ->required()
                                    ->label('Issued Date')
                                    ->native(false)
                                    ->displayFormat('d/m/Y'),
                                
                                DatePicker::make('expiry_date')
                                    ->label('Expiry Date')
                                    ->native(false)
                                    ->displayFormat('d/m/Y')
                                    ->helperText('Leave empty if lifetime'),
                            ]),
                    ]),
                
                // Section 5: Skills & Category
                Section::make('Skills & Category')
                    ->icon('heroicon-o-tag')
                    ->description('Select skills gained and certificate category')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Select::make('skills')
                                    ->label('Skills Gained')
                                    ->options(Skill::options())
                                    ->multiple()
                                    ->searchable()
                                    ->placeholder('Select skills')
                                    ->helperText('Choose all skills you learned')
                                    ->columnSpan(1),
                                
                                Select::make('category')
                                    ->label('Certificate Category')
                                    ->options(CertificateCategory::options())
                                    ->nullable()
                                    ->placeholder('Select category')
                                    ->searchable()
                                    ->helperText('Type of certificate')
                                    ->columnSpan(1),
                            ]),
                    ]),
                
                // Section 6: Display Settings
                Section::make('Display Settings')
                    ->icon('heroicon-o-cog-6-tooth')
                    ->description('Configure how this certificate appears on your portfolio')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Toggle::make('is_featured')
                                    ->label('Featured Certificate')
                                    ->helperText('Featured certificates will appear on homepage')
                                    ->default(false)
                                    ->onColor('success')
                                    ->offColor('danger'),
                            ]),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')
                    ->circular()
                    ->width(50)
                    ->height(50)
                    ->label('Image'),
                
                TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->limit(40)
                    ->label('Title'),
                
                TextColumn::make('issuer')
                    ->searchable()
                    ->sortable()
                    ->label('Issuer'),
                
                TextColumn::make('credential_id')
                    ->searchable()
                    ->label('Credential ID')
                    ->toggleable(isToggledHiddenByDefault: true),
                
                TextColumn::make('category')
                    ->badge()
                    ->label('Category'),
                
                TextColumn::make('skills')
                    ->badge()
                    ->limit(3)
                    ->formatStateUsing(fn ($state) => 
                        is_array($state) ? array_map(fn($s) => Skill::tryFrom($s)?->label() ?? $s, $state) : []
                    )
                    ->label('Skills')
                    ->toggleable(isToggledHiddenByDefault: true),
                
                TextColumn::make('issued_date')
                    ->date('M Y')
                    ->sortable()
                    ->label('Issued'),
                
                TextColumn::make('expiry_date')
                    ->date('M Y')
                    ->placeholder('Lifetime')
                    ->sortable()
                    ->label('Expires'),
                
                IconColumn::make('is_featured')
                    ->boolean()
                    ->label('Featured'),
                
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->options(CertificateCategory::options())
                    ->label('Category'),
                
                Tables\Filters\TernaryFilter::make('is_featured')
                    ->label('Featured Only'),
                
                Tables\Filters\TernaryFilter::make('expiry_date')
                    ->label('Validity')
                    ->placeholder('All')
                    ->trueLabel('Valid Only')
                    ->falseLabel('Expired Only')
                    ->queries(
                        true: fn ($query) => $query->whereNull('expiry_date')->orWhere('expiry_date', '>', now()),
                        false: fn ($query) => $query->where('expiry_date', '<=', now()),
                    ),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('sort_order', 'asc')
            ->defaultSort('issued_date', 'desc');
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCertificates::route('/'),
            'create' => Pages\CreateCertificate::route('/create'),
            'edit' => Pages\EditCertificate::route('/{record}/edit'),
        ];
    }
}