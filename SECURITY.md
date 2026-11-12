# Security Policy

## Supported Versions
Security updates and patches are actively maintained for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | Yes                |
| < 2.0   | No                 |

## Reporting Security Issues
We take the security of this machine learning system and its API endpoints seriously.

If you identify a security vulnerability, please do **not** report it through public GitHub issues. Instead, follow these steps:

1. **Email the Maintainers**: Send a detailed report describing the vulnerability, affected components (API, model pipeline, or web dashboard), and reproduction steps.
2. **Review & Response**: Maintainers will review the submission within 48 hours and determine an appropriate mitigation timeline.
3. **Coordinated Disclosure**: We request that you maintain confidentiality until an official patch or advisory is released to protect users and deployments.

## Security Best Practices
- Never commit production API keys, secrets, or credential tokens to git.
- Keep dependency lockfiles (`requirements.txt` and `package-lock.json`) updated against known CVE databases.
- Run containers under non-root users and isolate network endpoints appropriately.
