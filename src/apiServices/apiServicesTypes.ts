export type CredentialsType = {
    email: string, password: string
}

export type UserFormData = {
    first_name?: string;
    last_name?: string;
    patronymic_name?: string;
    email?: string;
    role?: number;
    city?: string;
    street?: string;
    house_number?: string;
    apartment_number?: string;
    birth_date?: string;
    user_id?: number;
}

export type EmployeeData = {
    position_id?: number;
    phone?: string;
    contract_number?: string;
    passport_data?: string;
    bank_account?: string;
    bank_title?: string;
    EDRPOU_bank_code?: string;
    code_IBAN?: string;
    medical_card_number?: string;
    employment_date?: string;
}

export type ParrentData = {
    phone?: string;
    work_place?: string;
    passport_data?: string;
    marital_status?: string;
    children?: ParrentChildData[];
}

export type ParrentChildData = {
    child_id: number;
    relations: string;
}

export type ParrentFormData = {
    user: UserFormData,
    parrent: ParrentData
}

export type EmployeeFormData = {
    user: UserFormData,
    employee: EmployeeData
}