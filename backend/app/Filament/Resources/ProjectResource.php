<?php

namespace App\Filament\Resources;

use App\Enums\ProjectCategory;
use App\Enums\Skill;
use App\Filament\Resources\ProjectResource\Pages;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $navigationIcon = 'heroicon-o-folder';

    protected static ?string $navigationLabel = 'Projects';

    protected static ?string $navigationGroup = 'Content';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // Section 1: Basic Information
                Section::make('Basic Information')
                    ->icon('heroicon-o-information-circle')
                    ->description('Project title and basic details')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('title')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('e.g., Portfolio Website, E-commerce App')
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn (string $operation, $state, Forms\Set $set) => 
                                        $operation === 'create' ? $set('slug', Str::slug($state)) : null),
                                
                                TextInput::make('slug')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('auto-generated-from-title')
                                    ->helperText('URL-friendly version of the title'),
                                
                                Select::make('category')
                                    ->label('Category')
                                    ->options(ProjectCategory::options())
                                    ->required()
                                    ->searchable(),
                            ]),
                    ]),
                
                // Section 2: Description & Content
                Section::make('Description & Content')
                    ->icon('heroicon-o-document-text')
                    ->description('Project description and detailed content')
                    ->schema([
                        Textarea::make('description')
                            ->required()
                            ->rows(4)
                            ->placeholder('Brief description of the project...')
                            ->helperText('This will appear in project cards and listings'),
                        
                        Textarea::make('content')
                            ->rows(10)
                            ->placeholder('Full project details, features, challenges, solutions...')
                            ->helperText('Detailed content for the project detail page')
                            ->columnSpanFull(),
                    ]),
                
                // Section 3: Media
                Section::make('Media')
                    ->icon('heroicon-o-photo')
                    ->description('Project images and gallery')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                FileUpload::make('image')
                                    ->image()
                                    ->disk('public')
                                    ->directory('projects')
                                    ->required()
                                    ->imagePreviewHeight('150')
                                    ->loadingIndicatorPosition('left')
                                    ->helperText('Main project image (required)'),
                                
                                FileUpload::make('images')
                                    ->image()
                                    ->disk('public')
                                    ->multiple()
                                    ->directory('projects/gallery')
                                    ->imagePreviewHeight('100')
                                    ->helperText('Additional gallery images (optional)')
                                    ->columnSpanFull(),
                            ]),
                    ]),
                
                // Section 4: Technologies
                Section::make('Technologies')
                    ->icon('heroicon-o-code-bracket')
                    ->description('Tech stack and tools used')
                    ->schema([
                        Select::make('technologies')
                            ->label('Technologies Used')
                            ->options(Skill::options())
                            ->multiple()
                            ->searchable()
                            ->required()
                            ->placeholder('Select technologies')
                            ->helperText('Programming languages, frameworks, libraries, tools'),
                    ]),
                
                // Section 5: Links
                Section::make('Project Links')
                    ->icon('heroicon-o-link')
                    ->description('Live demo and source code')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('project_url')
                                    ->label('Live Demo URL')
                                    ->url()
                                    ->maxLength(255)
                                    ->placeholder('https://example.com/project')
                                    ->helperText('Link to live project'),
                                
                                TextInput::make('github_url')
                                    ->label('GitHub Repository URL')
                                    ->url()
                                    ->maxLength(255)
                                    ->placeholder('https://github.com/username/project')
                                    ->helperText('Link to source code'),
                            ]),
                    ]),
                
                // Section 6: Completion & Dates
                Section::make('Completion & Dates')
                    ->icon('heroicon-o-calendar')
                    ->description('Project timeline')
                    ->schema([
                        DatePicker::make('completion_date')
                            ->required()
                            ->label('Completion Date')
                            ->native(false)
                            ->displayFormat('d/m/Y')
                            ->helperText('When was this project completed?'),
                    ]),
                
                // Section 7: Display Settings
                Section::make('Display Settings')
                    ->icon('heroicon-o-cog-6-tooth')
                    ->description('How this project appears on your portfolio')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Toggle::make('is_featured')
                                    ->label('Featured Project')
                                    ->helperText('Featured projects appear on homepage')
                                    ->default(false)
                                    ->onColor('success')
                                    ->offColor('gray'),
                                
                                Toggle::make('is_published')
                                    ->label('Published')
                                    ->helperText('Unpublished projects are hidden from public')
                                    ->default(true)
                                    ->onColor('success')
                                    ->offColor('danger'),
                                
                                TextInput::make('sort_order')
                                    ->numeric()
                                    ->default(0)
                                    ->label('Sort Order')
                                    ->helperText('Lower numbers appear first')
                                    ->minValue(0),
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
                    ->label('Title'),
                
                TextColumn::make('category')
                    ->badge()
                    ->label('Category'),
                
                TextColumn::make('technologies')
                    ->badge()
                    ->limit(3)
                    ->formatStateUsing(fn ($state) => 
                        is_array($state) ? $state : json_decode($state, true)
                    )
                    ->label('Tech Stack')
                    ->toggleable(isToggledHiddenByDefault: true),
                
                TextColumn::make('completion_date')
                    ->date('M Y')
                    ->sortable()
                    ->label('Completed'),
                
                IconColumn::make('is_featured')
                    ->boolean()
                    ->label('Featured'),
                
                IconColumn::make('is_published')
                    ->boolean()
                    ->label('Published'),
                
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
                Tables\Filters\SelectFilter::make('category')
                    ->options(ProjectCategory::options())
                    ->label('Category'),
                
                Tables\Filters\TernaryFilter::make('is_featured')
                    ->label('Featured Only'),
                
                Tables\Filters\TernaryFilter::make('is_published')
                    ->label('Published Only'),
                
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
            ->defaultSort('is_featured', 'desc')
            ->defaultSort('completion_date', 'desc')
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
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }
}