import ConversionPage from "@/components/ConversionPage";
import { downloadFile } from "@/lib/conversions";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

export default function PasswordGenerator() {
  return (
    <ConversionPage
      title="Free Password Generator Online | Generate Secure Passwords | ConvertAny"
      description="Generate secure passwords online for free. Create strong, random passwords. Fast, secure, and easy with no sign-up required."
      keywords="password generator, generate password, random password, secure password, online password generator"
      h1="Password Generator"
      acceptedFiles=".txt"
      outputExtension="txt"
      renderEditOptions={(files, setOptions) => {
        const [length, setLength] = useState(16);
        const [includeUpper, setIncludeUpper] = useState(true);
        const [includeLower, setIncludeLower] = useState(true);
        const [includeNumbers, setIncludeNumbers] = useState(true);
        const [includeSymbols, setIncludeSymbols] = useState(true);

        const updateOptions = () => {
          setOptions({ length, includeUpper, includeLower, includeNumbers, includeSymbols });
        };

        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Password Length</Label>
                <span className="text-2xl font-bold text-primary">{length}</span>
              </div>
              <Slider
                value={[length]}
                onValueChange={(value) => {
                  setLength(value[0]);
                  setOptions({ length: value[0], includeUpper, includeLower, includeNumbers, includeSymbols });
                }}
                min={8}
                max={64}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="space-y-3">
              <Label>Character Types</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="upper" 
                    checked={includeUpper}
                    onCheckedChange={(checked) => {
                      setIncludeUpper(checked as boolean);
                      updateOptions();
                    }}
                  />
                  <label htmlFor="upper" className="text-sm cursor-pointer">
                    Uppercase (A-Z)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="lower" 
                    checked={includeLower}
                    onCheckedChange={(checked) => {
                      setIncludeLower(checked as boolean);
                      updateOptions();
                    }}
                  />
                  <label htmlFor="lower" className="text-sm cursor-pointer">
                    Lowercase (a-z)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="numbers" 
                    checked={includeNumbers}
                    onCheckedChange={(checked) => {
                      setIncludeNumbers(checked as boolean);
                      updateOptions();
                    }}
                  />
                  <label htmlFor="numbers" className="text-sm cursor-pointer">
                    Numbers (0-9)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="symbols" 
                    checked={includeSymbols}
                    onCheckedChange={(checked) => {
                      setIncludeSymbols(checked as boolean);
                      updateOptions();
                    }}
                  />
                  <label htmlFor="symbols" className="text-sm cursor-pointer">
                    Symbols (!@#$%^&*)
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      }}
      conversionHandler={async (files, options) => {
        const length = options?.length || 16;
        let charset = '';
        
        if (options?.includeUpper !== false) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (options?.includeLower !== false) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (options?.includeNumbers !== false) charset += '0123456789';
        if (options?.includeSymbols !== false) charset += '!@#$%^&*';
        
        if (!charset) charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        
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
