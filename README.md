# Kavenegar SDK for Deno

## Supported methods (PRs are welcome)
- [ ] sms/send
- [ ] sms/sendarray
- [ ] sms/status
- [ ] sms/statuslocalmessageid
- [ ] sms/select
- [ ] sms/selectoutbox
- [ ] sms/latestoutbox
- [ ] sms/countoutbox
- [ ] sms/cancel
- [ ] sms/receive
- [ ] sms/countinbox
- [ ] sms/countpostalcode
- [ ] sms/sendbypostalcode
- [x] verify/lookup
- [x] account/info
- [ ] account/config
- [ ] call/maketts

## Example 
```ts
const kavenegar = new Kavenegar(API_KEY);

const info = await kavenegar.info();
```