<?php

namespace App\Enums;

enum CertificateCategory: string
{
    case COURSE = 'course';
    case BOOTCAMP = 'bootcamp';
    case COMPETITION = 'competition';
    case PROFESSIONAL = 'professional';
    case LANGUAGE = 'language';
    case WORKSHOP = 'workshop';
    case ACADEMIC = 'academic';

    public function label(): string
    {
        return match($this) {
            self::COURSE => 'Online Course',
            self::BOOTCAMP => 'Bootcamp',
            self::COMPETITION => 'Competition',
            self::PROFESSIONAL => 'Professional Certification',
            self::LANGUAGE => 'Language Certificate',
            self::WORKSHOP => 'Workshop',
            self::ACADEMIC => 'Academic Degree',
        };
    }

    public static function options(): array
    {
        return [
            self::COURSE->value => self::COURSE->label(),
            self::BOOTCAMP->value => self::BOOTCAMP->label(),
            self::COMPETITION->value => self::COMPETITION->label(),
            self::PROFESSIONAL->value => self::PROFESSIONAL->label(),
            self::LANGUAGE->value => self::LANGUAGE->label(),
            self::WORKSHOP->value => self::WORKSHOP->label(),
            self::ACADEMIC->value => self::ACADEMIC->label(),
        ];
    }
}