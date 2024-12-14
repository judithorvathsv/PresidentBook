export type PresidentProps = {
    id:number,
    firstName:string, 
    lastName:string, 
    startYear:number, 
    endYear:number
}

export type PresidentFormProps = {
    handleAddPresident: () => void;
}