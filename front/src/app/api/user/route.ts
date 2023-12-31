import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server'

export async function POST( request: NextRequest ) {
    const res = await request.json()

    try {    
        const response = await fetch(`${process.env.URL_USER_MS}/`, { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(res)
        });

        const responseString = await response.text();
        const message = JSON.parse(responseString).message
        return NextResponse.json({ message }, { status: response.status });
    } catch(err) {
        return NextResponse.json({ mensagemUsuario: 'Erro interno da aplicação' }, { status: 500 });
    }
}