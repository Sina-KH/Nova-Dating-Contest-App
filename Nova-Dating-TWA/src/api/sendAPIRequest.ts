import axios from 'axios';
import { ApiRequestMethod } from '@/api/requests/IApiRequest';

export async function sendAPIRequest<O>(
    method: ApiRequestMethod,
    path: string,
    input: any,
    token?: string
): Promise<O> {
    switch (method.toString()) {
        case ApiRequestMethod.GET.toString():
            try {
                const response = await axios.get<O>(`${process.env.NEXT_PUBLIC_URL_BACK}` + path, {
                    params: input,
                    headers: {
                        token: token
                    }
                });
                return response.data;
            } catch (e) {
                throw e;
            }
        case ApiRequestMethod.POST.toString():
            try {
                const response = await axios.post<O>(`${process.env.NEXT_PUBLIC_URL_BACK}` + path, input, {
                    headers: {
                        token: token
                    }
                });
                return response.data;
            } catch (e) {
                throw e;
            }
        case ApiRequestMethod.FORM_DATA.toString():
            try {
                const formData = new FormData();
                for (const key of Object.keys(input)) if (input[key] !== undefined) formData.append(key, input[key]);
                const response = await axios.post<O>(`${process.env.NEXT_PUBLIC_URL_BACK}` + path, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        token
                    }
                });
                return response.data;
            } catch (e) {
                throw e;
            }
    }
    throw new Error();
}
