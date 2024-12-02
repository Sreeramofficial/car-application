type Status="pending"|"failed"|"completed";
const statusall : Exclude<Status,"pending">="completed";

// here we excluding the completed status 

// Recored

// type Food={
//     KFC :string,
//     PIZZA:string
// }


type Food=Record<string,string>;
const food:Food={

}