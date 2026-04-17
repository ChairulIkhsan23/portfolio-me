<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EducationResource\Pages;
use App\Models\Education;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class EducationResource extends Resource
{
    protected static ?string $model = Education::class;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';

    protected static ?string $navigationLabel = 'Education';

    protected static ?string $navigationGroup = 'Content';

    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // Section 1: Institution Information
                Section::make('Institution Information')
                    ->icon('heroicon-o-building-library')
                    ->description('Where did you study?')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('institution')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('e.g., Universitas Indonesia')
                                    ->columnSpanFull(),
                                
                                TextInput::make('logo')
                                    ->maxLength(255)
                                    ->placeholder('URL or path to institution logo'),
                            ]),
                    ]),
                
                // Section 2: Academic Program
                Section::make('Academic Program')
                    ->icon('heroicon-o-academic-cap')
                    ->description('Degree and field of study')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('degree')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('e.g., Sarjana Komputer, Bachelor of Science'),
                                
                                TextInput::make('field_of_study')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('e.g., Computer Science, Information Systems'),
                                
                                TextInput::make('grade')
                                    ->maxLength(255)
                                    ->placeholder('e.g., 3.85 GPA, Cum Laude, 90/100'),
                            ]),
                    ]),
                
                // Section 3: Duration
                Section::make('Study Period')
                    ->icon('heroicon-o-calendar')
                    ->description('When did you study?')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                DatePicker::make('start_date')
                                    ->required()
                                    ->label('Start Date')
                                    ->native(false)
                                    ->displayFormat('d/m/Y'),
                                
                                DatePicker::make('end_date')
                                    ->label('End Date')
                                    ->native(false)
                                    ->displayFormat('d/m/Y')
                                    ->helperText('Leave empty if still studying'),
                                
                                Toggle::make('is_current')
                                    ->label('Currently studying here')
                                    ->default(false)
                                    ->onColor('success')
                                    ->offColor('gray')
                                    ->helperText('Check if you are still studying'),
                            ]),
                    ]),
                
                // Section 4: Description
                Section::make('Additional Information')
                    ->icon('heroicon-o-document-text')
                    ->description('Any achievements, activities, or notes')
                    ->schema([
                        Textarea::make('description')
                            ->rows(4)
                            ->placeholder('Describe your experience, achievements, or activities during this period')
                            ->columnSpanFull(),
                    ]),
                
                // Section 5: Display Settings
                Section::make('Display Settings')
                    ->icon('heroicon-o-cog-6-tooth')
                    ->description('Configure display order')
                    ->schema([
                        TextInput::make('sort_order')
                            ->numeric()
                            ->default(0)
                            ->label('Sort Order')
                            ->helperText('Lower numbers appear first')
                            ->minValue(0),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('institution')
                    ->searchable()
                    ->sortable()
                    ->label('Institution'),
                
                TextColumn::make('degree')
                    ->searchable()
                    ->label('Degree'),
                
                TextColumn::make('field_of_study')
                    ->searchable()
                    ->label('Field of Study')
                    ->toggleable(isToggledHiddenByDefault: true),
                
                TextColumn::make('grade')
                    ->searchable()
                    ->badge()
                    ->color(fn (string $state): string => match (true) {
                        str_contains($state, 'Cum') => 'success',
                        str_contains($state, '3.') => 'info',
                        str_contains($state, '4.') => 'success',
                        default => 'gray',
                    })
                    ->label('Grade'),
                
                TextColumn::make('start_date')
                    ->date('M Y')
                    ->sortable()
                    ->label('Start'),
                
                TextColumn::make('end_date')
                    ->date('M Y')
                    ->placeholder('Present')
                    ->sortable()
                    ->label('End'),
                
                IconColumn::make('is_current')
                    ->boolean()
                    ->label('Current')
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-x-circle')
                    ->trueColor('success')
                    ->falseColor('gray'),
                
                TextColumn::make('sort_order')
                    ->numeric()
                    ->sortable()
                    ->label('Order')
                    ->toggleable(isToggledHiddenByDefault: true),
                
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
                Tables\Filters\TernaryFilter::make('is_current')
                    ->label('Currently Studying'),
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
            ->defaultSort('is_current', 'desc')
            ->defaultSort('start_date', 'desc')
            ->defaultSort('sort_order', 'asc');
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
            'index' => Pages\ListEducation::route('/'),
            'create' => Pages\CreateEducation::route('/create'),
            'edit' => Pages\EditEducation::route('/{record}/edit'),
        ];
    }
}