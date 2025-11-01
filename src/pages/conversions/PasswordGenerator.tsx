import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";

export default function PasswordGenerator() {
  return (
    <ConversionPage
      title="Free Password Generator Online | Generate Secure Passwords | ConvertAny"
      description="Generate secure passwords online for free. Create strong, random passwords. Fast, secure, and easy with no sign-up required."
      keywords="password generator, generate password, random password, secure password, online password generator"
      h1="Password Generator"
      acceptedFiles=".txt"
      outputExtension="txt"
      conversionHandler={async (files) => {
        const length = 16;
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        let password = '';
        const array = new Uint8Array(length);
        crypto.getRandomValues(array);
        for (let i = 0; i < length; i++) {
          password += charset[array[i] % charset.length];
        }
        const blob = new Blob([`Generated Password: ${password}`], { type: 'text/plain' });
        downloadFile(blob, "password.txt");
      }}
      relatedTools={[
        { name: "Hash Generator", path: "/hash-generator" },
        { name: "Base64 Encode", path: "/base64-encode" },
        { name: "Text to QR", path: "/text-to-qr" },
        { name: "Text Converter", path: "/text-converter" },
      ]}
    />
  );
}
