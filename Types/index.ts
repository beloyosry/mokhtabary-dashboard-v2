export type TableData = {
    tableName?: string;
    tableHeaders: string[];
    tableData: any[];
    actionRoutes: {
        update?: (id: string) => string;
        test?: (id: string) => string;
        view?: (id: string) => string;
        add?: (id: string) => string;
        delete?: boolean;
    };
    infoSection?: boolean;
    createBtn?: {
        name: string;
        href: string;
    };
    currentPage?: any;
    perPage?: any;
    totalPages?: any;
    singleSliceFn?: any;
};

export type TableType = {
    [key: string]: TableData;
};

export type TabProps = {
    value: string;
    label: string;
    onClick?: () => void;
};

export type InfoBarType = {
    mainInfo?: {
        logo: string;
        title: string;
        additionalInfo: string[];
    };
    restInfo?: {
        [key: string]: string;
    };
};

export type UserRole = "admin" | "lab";

export type FormField = {
    name: string;
    label: string;
    type: string;
    accessBy: UserRole[];
    disabled?: boolean;
};

export type FormData = {
    fields: FormField[];
    formTitle?: string;
    onSubmit?: () => void;
};

export type LocationItem = {
    id: number;
    name_en: string;
    name_ar: string;
};

export type User = {
    id: number;
    email: string;
    phone: string;
    name?: string;
    img: string;
    countryInfo?: LocationItem;
    governorateInfo?: LocationItem;
    cityInfo?: LocationItem;
    street?: string;
    description?: string;
    createdAt?: null;
    updatedAt?: null;
    phoneVerifiedAt?: string;
    role?: UserRole;
    branch?: Branch[];
};

export type Branch = {
    parent_id: number;
    name: string;
    email: string;
    phone: string;
    password: string;
    country_id: number;
    governorate_id: number;
    city_id: number;
    street: string;
    description: string;
};

export type TestItem = {
    id: number;
    testNameEn: string;
    testNameAr: string;
    numCode: number;
    contractPrice: number | null;
    beforePrice: number | null;
    afterPrice: number | null;
    offerPrice: number | null;
};

export type XRayItem = {
    id: number;
    xrayNameEn: string;
    xrayNameAr: string;
    numCode: number;
    contractPrice: number | null;
    beforePrice: number | null;
    afterPrice: number | null;
    offerPrice: number | null;
};

export type BasicInfo = {
    logo: string;
    phoneNumber: string;
    mobileNumber: string;
    whatsapp: string;
    facebook: string;
    instagram: string;
    x: string;
    tiktok: string;
    snapchat: string;
    linkedin: string;
    website: string;
    emailAddress: string;
    address: string;
    aboutUs: string;
};

export type Policy = {
    id: number;
    policy: string;
};

export type QnA = {
    id: number;
    question: string;
    answer: string;
};

export type Terms = {
    id: number;
    term_condition: string;
};

export type CityInfo = {
    id: number;
    nameAr: string;
    nameEn: string;
};

export type CountryInfo = {
    id: number;
    name_ar: string;
    name_en: string;
};

export type Governorate = {
    id: number;
    countryId: number;
    nameAr: string;
    nameEn: string;
    createdAt: string | null;
    updatedAt: string | null;
    countryInfo: CountryInfo;
    cityInfo: CityInfo[];
};

export type Coupon = {
    id: number;
    code: string;
    discountPercentage: number;
    expirationDate: string;
    isActive: number;
    createdAt: string;
};

export type Offer = {
    id: number;
    name: string;
    totale: number;
    receiver: {
        email: string;
        phone: string;
        name: string;
        country: CountryInfo;
        city: CityInfo;
        state: string | null;
        street: string;
        postCode: string | null;
        description: string;
    };
    details: Array<{
        contractPrice: number;
        beforePrice: number;
        afterPrice: number;
        offerPrice: number;
        numCode: number;
        code: string;
        nameEn: string | null;
        nameAr: string | null;
    }>;
    createdAt: string;
    updatedAt: string;
};

export type Package = {
    id: number;
    name: string;
    totale: number;
    receiver: {
        email: string;
        phone: string;
        name: string;
        country: CountryInfo;
        city: CityInfo;
        state: string | null;
        street: string;
        postCode: string | null;
        description: string;
    };
    details: Array<{
        contractPrice: number;
        beforePrice: number;
        afterPrice: number;
        offerPrice: number;
        numCode: number;
        code: string;
        nameEn: string | null;
        nameAr: string | null;
    }>;
    createdAt: string;
    updatedAt: string;
};
