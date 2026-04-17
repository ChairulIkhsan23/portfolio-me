<?php

namespace App\Filament\Resources\EducationResource\Pages;

use App\Filament\Resources\EducationResource;
use Filament\Actions;
use Filament\Actions\Action;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditEducation extends EditRecord
{
    protected static string $resource = EducationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make()
                ->label('Delete')
                ->icon('heroicon-o-trash')
                ->modalDescription('Apakah Anda yakin ingin menghapus ini? Data yang sudah dihapus tidak dapat dikembalikan.')
                ->modalSubmitActionLabel('Ya, Hapus')
                ->modalCancelActionLabel('Batal'),
        ];
    }

    protected function getFormActions(): array
    {
        return [
            Action::make('back')
            ->label('Cancel')
            ->color('gray')
            ->url($this->getResource()::getUrl('index'))
            ->icon('heroicon-o-arrow-left'),
            
            $this->getSaveFormAction()
            ->label('Save Changes')
            ->icon('heroicon-o-check'),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
