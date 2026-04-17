<?php

namespace App\Filament\Resources;

use App\Enums\Skill;
use App\Filament\Resources\ExperienceResource\Pages;
use App\Models\Experience;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ExperienceResource extends Resource
{
    protected static ?string $model = Experience::class;

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';

    protected static ?string $navigationLabel = 'Work Experiences';

    protected static ?string $navigationGroup = 'Content';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // Section 1: Company Information
                Section::make('Company Information')
                    ->icon('heroicon-o-building-office')
                    ->description('Where did you work?')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('company')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('e.g., Google, Microsoft, Startup XYZ')
                                    ->columnSpanFull(),
                                
                                TextInput::make('company_logo')
                                    ->maxLength(255)
                                    ->placeholder('URL or path to company logo'),
                                
                                TextInput::make('location')
                                    ->maxLength(255)
                                    ->placeholder('e.g., Jakarta, Indonesia / Remote'),
                            ]),
                    ]),
                
                // Section 2: Position Details
                Section::make('Position Details')
                    ->icon('heroicon-o-user')
                    ->description('Your role and responsibilities')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('position')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('e.g., Senior Full Stack Developer, Software Engineer')
                                    ->columnSpanFull(),
                                
                                Textarea::make('description')
                                    ->required()
                                    ->rows(5)
                                    ->placeholder('Describe your responsibilities, achievements, and day-to-day tasks...')
                                    ->columnSpanFull(),
                            ]),
                    ]),
                
                // Section 3: Technologies & Achievements
                Section::make('Technologies & Achievements')
                    ->icon('heroicon-o-code-bracket')
                    ->description('Tools, technologies, and key achievements')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Select::make('technologies')
                                    ->label('Technologies Used')
                                    ->options(Skill::options())
                                    ->multiple()
                                    ->searchable()
                                    ->placeholder('Select technologies')
                                    ->helperText('Programming languages, frameworks, tools you used'),
                                
                                TagsInput::make('achievements')
                                    ->label('Key Achievements')
                                    ->placeholder('Add an achievement')
                                    ->separator(',')
                                    ->helperText('Notable accomplishments (e.g., "Increased performance by 30%")'),
                            ]),
                    ]),
                
                // Section 4: Duration
                Section::make('Employment Period')
                    ->icon('heroicon-o-calendar')
                    ->description('When did you work there?')
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
                                    ->helperText('Leave empty if still working here'),
                                
                                Toggle::make('is_current')
                                    ->label('Currently working here')
                                    ->default(false)
                                    ->onColor('success')
                                    ->offColor('gray')
                                    ->helperText('Check if this is your current job'),
                            ]),
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
                TextColumn::make('company')
                    ->searchable()
                    ->sortable()
                    ->label('Company'),
                
                TextColumn::make('position')
                    ->searchable()
                    ->label('Position'),
                
                TextColumn::make('location')
                    ->searchable()
                    ->label('Location')
                    ->toggleable(isToggledHiddenByDefault: true),
                
                TextColumn::make('technologies')
                    ->badge()
                    ->limit(3)
                    ->formatStateUsing(fn ($state) => 
                        is_array($state) ? $state : json_decode($state, true)
                    )
                    ->label('Tech Stack')
                    ->toggleable(isToggledHiddenByDefault: true),
                
                TextColumn::make('achievements')
                    ->limit(30)
                    ->label('Achievements')
                    ->toggleable(isToggledHiddenByDefault: true),
                
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
                    ->label('Current Position'),
                
                Tables\Filters\SelectFilter::make('technologies')
                    ->options(Skill::options())
                    ->multiple()
                    ->label('Technologies'),
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
            'index' => Pages\ListExperiences::route('/'),
            'create' => Pages\CreateExperience::route('/create'),
            'edit' => Pages\EditExperience::route('/{record}/edit'),
        ];
    }
}