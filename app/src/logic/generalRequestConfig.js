export default class GeneralRequestConfig {
  constructor(service_key) {
    this.service_key = service_key;
  }

  setUp(method, body) {
    const config = {
      method,
      mode: "cors",
      headers: {
        service_key: this.service_key,
        "Content-Type": "application/json",
      },
    };

    if (body) config.body = JSON.stringify(body);

    return config;
  }
}
