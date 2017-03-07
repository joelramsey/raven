export interface CloudConvertProcessResponse {
  url: string;
  id: string;
  host: string;
  expires: string;
  maxtime: number;
  minutes: number;
}

export interface CloudConvertCompletedResponse {
  id: string;
  url: string;
  expire: number;
  percent: number;
  message: string;
  step: string;
  starttime: number;
  output: {
    url: string;
    filename: string;
    ext: string;
    size: number;
  },
  input: {
    filename: string;
    name: string;
    ext: string;
  },
  converter: {
    mode: string;
    format: string;
    type: string;
    options: {
      input_password: string;
      embed_images: string;
    }
  },
  group: string;
  minutes: number;
  endtime: number;
}
