/**
 * As client management functionality is not in scope of this tutorial, 
 * here we are only creating interface of client model for type safety.
 * If we are suppposed to create client management functionality also, we will be
 * creating model class instead of interface.
 */
export interface Client{
    id: number;
    name: string;
    timezone: string;
    country: string;
    email: string;
}