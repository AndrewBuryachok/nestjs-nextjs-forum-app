type Props = {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function GET(req: Request, props: Props) {
  const apiKey = req.headers.get('x-api-key');
  if (apiKey !== process.env.CLIENT_MOD_API_KEY) {
    return Response.json(0, { status: 401 });
  }
  try {
    const params = await props.params;
    const res = await fetch(`${process.env.API_URL}/cards/${params.nick}/sum`, {
      headers: {
        'x-api-key': process.env.SERVER_MOD_API_KEY!,
      },
    });
    if (!res.ok) {
      return Response.json(0, { status: res.status });
    }
    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    return Response.json(0, { status: 500 });
  }
}
