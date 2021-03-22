export interface Company {
    id: number;
    name: string;
    Size: 'small_1_to_50' | 'medium_51_to_250' | 'large_251_and_more';
    website_url: string;
    contact_email: string;
    logo: { 
        url: string; 
    };
    created_at: Date;
    updated_at: Date;
}