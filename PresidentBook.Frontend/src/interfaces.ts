type FetchPresidentListProps =  () => void;

export type PresidentProps = {
    id:number,
    firstName:string, 
    lastName:string, 
    startYear:number, 
    endYear:number,
    handleGetPresident: FetchPresidentListProps;
}

export type PresidentFormProps = {
    handleAddPresident: FetchPresidentListProps;
}