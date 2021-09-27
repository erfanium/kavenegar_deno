export interface CallApiResult<T> {
  return: {
    status: number;
    message: string;
  };
  entries: T;
}

export interface VerifyLookupParams {
  receptor: string;
  token: string;
  token2?: string;
  token3?: string;
  token10?: string;
  token20?: string;
  template: string;
  type?: string;
}

export interface VerifyLookupResult {
  messageid: number;
  message: string;
  status: number;
  statustext: string;
  sender: string;
  receptor: string;
  date: number;
  cost: number;
}

export interface InfoResult {
  remaincredit: number;
  expiredate: number;
  type: string;
}

// deno-lint-ignore no-explicit-any
function deleteBadValues(obj: any) {
  for (const key in obj) {
    const value = obj[key];
    if (value === null) {
      delete obj[key];
      continue;
    }
    if (value === undefined) delete obj[key];
  }
}

export class Kavenegar {
  baseUrl = "https://api.kavenegar.com/v1";
  apikey: string;
  fetch = fetch;

  constructor(apiKey: string) {
    this.apikey = apiKey;
  }

  async callApi<T>(
    method: string,
    params: unknown,
  ): Promise<CallApiResult<T>> {
    const body = new URLSearchParams(params as any).toString();
    const response = await this.fetch(
      `${this.baseUrl}/${this.apikey}/${method}.json`,
      {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Content-Length": body.length.toString(),
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Kavenegar error on "${method}". method status:"${response.status} ${response.statusText}"`,
      );
    }

    return await response.json();
  }

  async verifyLookup(params: VerifyLookupParams): Promise<VerifyLookupResult> {
    deleteBadValues(params);
    const result = await this.callApi<VerifyLookupResult>(
      "verify/lookup",
      params,
    );

    return result.entries;
  }

  async info() {
    const result = await this.callApi<InfoResult>("account/info", {});
    return result.entries;
  }
}
