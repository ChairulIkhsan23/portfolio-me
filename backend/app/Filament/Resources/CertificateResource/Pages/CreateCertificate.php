<?php

namespace App\Filament\Resources\CertificateResource\Pages;

use App\Filament\Resources\CertificateResource;
use Filament\Actions;
use Filament\Actions\Action;
use Filament\Resources\Pages\CreateRecord;

class CreateCertificate extends CreateRecord
{
    protected static string $resource = CertificateResource::class;

    protected function getFormActions(): array
    {
        return [
            Action::make('back')
            ->label('Back')
            ->color('gray')
            ->url($this->getResource()::getUrl('index'))
            ->icon('heroicon-o-arrow-left'),
            
            $this->getCreateFormAction()
            ->label('Save')
            ->icon('heroicon-o-check'),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
