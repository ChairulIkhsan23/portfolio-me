<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MessageResource\Pages;
use App\Models\Message;
use Filament\Forms;
use Filament\Forms\Components\DateTimePicker;
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
use Illuminate\Database\Eloquent\Builder;

class MessageResource extends Resource
{
    protected static ?string $model = Message::class;

    protected static ?string $navigationIcon = 'heroicon-o-envelope';

    protected static ?string $navigationLabel = 'Contact Messages';

    protected static ?string $navigationGroup = 'Admin';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // Section 1: Sender Information
                Section::make('Sender Information')
                    ->icon('heroicon-o-user')
                    ->description('Who sent this message?')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('name')
                                    ->required()
                                    ->maxLength(255)
                                    ->disabled()
                                    ->dehydrated(false)
                                    ->placeholder('Sender name'),
                                
                                TextInput::make('email')
                                    ->email()
                                    ->required()
                                    ->maxLength(255)
                                    ->disabled()
                                    ->dehydrated(false)
                                    ->placeholder('sender@example.com'),
                                
                                TextInput::make('phone')
                                    ->tel()
                                    ->maxLength(255)
                                    ->disabled()
                                    ->dehydrated(false)
                                    ->placeholder('Phone number (optional)'),
                                
                                TextInput::make('ip_address')
                                    ->maxLength(255)
                                    ->disabled()
                                    ->dehydrated(false)
                                    ->label('IP Address'),
                            ]),
                    ]),
                
                // Section 2: Message Content
                Section::make('Message Content')
                    ->icon('heroicon-o-chat-bubble-left-right')
                    ->description('The actual message sent by the user')
                    ->schema([
                        TextInput::make('subject')
                            ->required()
                            ->maxLength(255)
                            ->disabled()
                            ->dehydrated(false)
                            ->placeholder('Message subject'),
                        
                        Textarea::make('message')
                            ->required()
                            ->rows(6)
                            ->disabled()
                            ->dehydrated(false)
                            ->placeholder('Message body...')
                            ->columnSpanFull(),
                    ]),
                
                // Section 3: Status
                Section::make('Message Status')
                    ->icon('heroicon-o-check-circle')
                    ->description('Read status and tracking')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Toggle::make('is_read')
                                    ->label('Mark as Read')
                                    ->helperText('Toggle to mark this message as read/unread')
                                    ->onColor('success')
                                    ->offColor('gray'),
                                
                                DateTimePicker::make('read_at')
                                    ->label('Read At')
                                    ->disabled()
                                    ->dehydrated(false)
                                    ->helperText('Auto-filled when marked as read'),
                            ]),
                    ]),
                
                // Section 4: Metadata
                Section::make('Metadata')
                    ->icon('heroicon-o-information-circle')
                    ->description('System information')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Forms\Components\Placeholder::make('created_at')
                                    ->label('Sent At')
                                    ->content(fn ($record) => $record?->created_at?->format('d/m/Y H:i:s') ?? '-'),
                                
                                Forms\Components\Placeholder::make('updated_at')
                                    ->label('Last Updated')
                                    ->content(fn ($record) => $record?->updated_at?->format('d/m/Y H:i:s') ?? '-'),
                            ]),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->label('Name'),
                
                TextColumn::make('email')
                    ->searchable()
                    ->label('Email'),
                
                TextColumn::make('subject')
                    ->searchable()
                    ->limit(40)
                    ->label('Subject'),
                
                TextColumn::make('phone')
                    ->searchable()
                    ->label('Phone')
                    ->toggleable(isToggledHiddenByDefault: true),
                
                IconColumn::make('is_read')
                    ->boolean()
                    ->label('Read')
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-envelope')
                    ->trueColor('success')
                    ->falseColor('warning'),
                
                TextColumn::make('created_at')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->label('Sent At'),
                
                TextColumn::make('read_at')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->label('Read At')
                    ->toggleable(isToggledHiddenByDefault: true),
                
                TextColumn::make('ip_address')
                    ->searchable()
                    ->label('IP Address')
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_read')
                    ->label('Read Status')
                    ->placeholder('All Messages')
                    ->trueLabel('Read')
                    ->falseLabel('Unread'),
                
                Tables\Filters\Filter::make('created_at')
                    ->form([
                        Forms\Components\DatePicker::make('from')
                            ->label('From Date'),
                        Forms\Components\DatePicker::make('until')
                            ->label('Until Date'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when($data['from'], fn ($q, $date) => $q->whereDate('created_at', '>=', $date))
                            ->when($data['until'], fn ($q, $date) => $q->whereDate('created_at', '<=', $date));
                    })
                    ->label('Date Range'),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\BulkAction::make('markAsRead')
                        ->label('Mark as Read')
                        ->icon('heroicon-o-check-circle')
                        ->action(fn ($records) => $records->each->update(['is_read' => true, 'read_at' => now()])),
                    Tables\Actions\BulkAction::make('markAsUnread')
                        ->label('Mark as Unread')
                        ->icon('heroicon-o-envelope')
                        ->action(fn ($records) => $records->each->update(['is_read' => false, 'read_at' => null])),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
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
            'index' => Pages\ListMessages::route('/'),
            'create' => Pages\CreateMessage::route('/create'),
            'edit' => Pages\EditMessage::route('/{record}/edit'),
        ];
    }
}