export type ProfileData = {
    id?: number;
    name?: string;
    code?: string;
    phone?: string;
    email?: string;
    accountType?: string;
    photo?: string;
    status?: string;
    phoneVerifiedAt?: string;
    account?: {
        id: string;
        userId: string;
        parentId: string | null;
        countryInfo: {
            id: string;
            nameAr: string;
            nameEn: string;
        };
        governorateInfo: {
            id: string;
            nameAr: string;
            nameEn: string;
        };
        cityInfo: {
            id: string;
            nameAr: string;
            nameEn: string;
        };
        street: string;
        description: string;
        entityType: string;
    };
};

export type AuthProfileUpdateData = {
    name?: string;
    code?: string;
    phone?: string;
    country_id?: number;
    governorate_id?: number;
    city_id?: number;
    street?: string;
    description?: string;
    photo?: string;
};

export type PasswordUpdateData = {
    password: string;
    new_password: string;
    new_password_confirmation: string;
};
