<?php

namespace App\Enums;

enum ProjectCategory: string
{
    case WEB = 'web-development';
    case MOBILE = 'mobile-development';
    case API = 'api-development';
    case FULLSTACK = 'fullstack';
    case AI = 'ai-ml';
    case UIUX = 'ui-ux-design';
    case OPENSOURCE = 'open-source';

    public function label(): string
    {
        return match($this) {
            self::WEB => 'Web Development',
            self::MOBILE => 'Mobile Development',
            self::API => 'API Development',
            self::FULLSTACK => 'Fullstack',
            self::AI => 'AI & Machine Learning',
            self::UIUX => 'UI/UX Design',
            self::OPENSOURCE => 'Open Source',
        };
    }

    public static function options(): array
    {
        return [
            self::WEB->value => self::WEB->label(),
            self::MOBILE->value => self::MOBILE->label(),
            self::API->value => self::API->label(),
            self::FULLSTACK->value => self::FULLSTACK->label(),
            self::AI->value => self::AI->label(),
            self::UIUX->value => self::UIUX->label(),
            self::OPENSOURCE->value => self::OPENSOURCE->label(),
        ];
    }
}