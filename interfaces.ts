export interface ReservationItem {
    hotelId: string,
    revDate: string,
    nightNum: number,
    room: string,
    price: number
}

export interface HotelJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: HotelItem[]
}

export interface ReserveJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: Reservation[]
}

export interface PaymentJson{
    message: string,
    id: string
}

export interface ReserveOneJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: Reservation
}

export interface ReviewJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: ShowReviewItem[]
}

export interface RoomJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: Room[]
}



export interface Reservation{
    _id: string,
    revDate : string,
    nightNum: number,
    user: {
        _id: string,
        name: string
    },
    hotel: {
        _id: string,
        name: string,
        province: string,
        tel: string,
        picture: string,
        id: string,
        paymentqr:string,
        paymentname:string,
        paymentnum:string,
    },
    room: {
        _id: string,
        roomtype: string,
        bedtype: string,
        roomcap: number
    },
    totalPrice: number,
    status: string,
    createdAt: Date,
    __v: number
}

export interface HotelItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    region: string,
    tel: string,
    picture: string,
    __v: number,
    id: string
}

export interface ReviewItem {
    hotelid : string,
    stars: number,
    comment :string,
    title:string,
    userid:string,
    report:Array<string>,
    service:boolean,
    food:boolean,
    convenience:boolean,
    cleanliness:boolean,
    facility:boolean,
    worthiness:boolean
    reply: {
        userreply:string,
        reply:string,
        date:Date
    }
}

export interface ShowReviewItem {
    _id : string,
    hotelid : string,
    stars: number,
    comment :string,
    title:string,
    userid:{
        _id: string,
        name: string
    },
    report:Array<string>,
    service:boolean,
    food:boolean,
    convenience:boolean,
    cleanliness:boolean,
    facility:boolean,
    worthiness:boolean
    reply: {
        userreply:string,
        reply:string,
        date:Date
    }
}

export interface Tags {
    service:boolean,
    food:boolean,
    convenience:boolean,
    cleanliness:boolean,
    facility:boolean,
    worthiness:boolean,
    stars:number|null
}

export interface Room{
    _id: string,
    hotel_id: string,
    price: number,
    roomtype: string,
    bedtype: string,
    picture: string,
    roomcap: number
}

export interface Payment {
    data : {

    
        reservid: {
            _id: string;
            revDate: string;
            nightNum: number;
            user: {
                _id: string;
                name: string;
                tel: string;
                email: string;
                role: string;
            };
            hotel: {
                _id: string;
                name: string;
                address: string;
                district: string;
                province: string;
                postalcode: string;
                tel: string;
                region: string;
                picture: string;
                id : string
            };
            room: {
                _id: string;
                hotel_id: string;
                price: number;
                roomtype: string;
                bedtype: string;
                picture: string;
                roomcap: number;
            };
            totalPrice: number;
            status: string;
            createdAt: string;
            __v: number;
            sessionId: string;
        };
        image: string;
        paytime : string;
        paydate : string;
        paydep: string;
}
}

