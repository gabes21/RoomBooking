export class Users {
    public Id: number;
    public fname: string;
    public lname: string;
    public sdate: string;
    public edate: string;
    
    constructor(Id: number, fname: string, lname: string, sdate: string, edate: string) {
    this.Id = Id;
    this.fname = fname;
    this.lname = lname;
    this.sdate = sdate;
    this.edate = edate;
    }
    }