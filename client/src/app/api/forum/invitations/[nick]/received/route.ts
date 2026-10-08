type Props = {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function GET(req: Request, props: Props) {
  const apiKey = req.headers.get('x-api-key');
  if (apiKey !== process.env.CLIENT_MOD_API_KEY) {
    return Response.json({}, { status: 401 });
  }
  try {
    const params = await props.params;
    const res = await fetch(
      `${process.env.API_URL}/mod/invitations/${params.nick}/received`,
      {
        headers: {
          'x-api-key': process.env.SERVER_MOD_API_KEY!,
        },
      },
    );
    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch (error) {
    return Response.json({}, { status: 500 });
  }
}
