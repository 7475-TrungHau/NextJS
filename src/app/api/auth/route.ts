
export async function POST (req: Request) {
    const res = await req.json();
    const sessionToken = res.sessionToken as string;
    if (sessionToken === '') {
        return Response.json({ message: 'Logout success' }, {status: 200, headers: { 'set-cookie': `sessionToken=; Path=/; HTTPOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT`}});
    }

    return Response.json({message: 'Login success', token: sessionToken}, {
        status: 201,
        headers: {
            'set-cookie': `sessionToken=${sessionToken}; Path=/; HTTPOnly;`
        }
    })
}