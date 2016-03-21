/**
 * As employee management functionality is not in scope of this tutorial, 
 * here we are only creating interface of employee model for type safety.
 * If we are suppposed to create employee management functionality also, we will be
 * creating model class instead of interface.
 */
export interface Employee{
    id: number;
    name: string;
    role: string;
    email: string;
}