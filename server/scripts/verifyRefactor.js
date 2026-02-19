
import * as encryption from '../services/encryption.service.js';

async function testEncryption() {
    console.log("--- Testing Encryption Service ---");
    const sensitivity = "SecretData123";

    try {
        console.log("Encrypting...");
        const encrypted = await encryption.encrypt(sensitivity);
        console.log("Encrypted:", encrypted);

        console.log("Decrypting...");
        const decrypted = await encryption.decrypt(encrypted);
        console.log("Decrypted:", decrypted);

        if (decrypted === sensitivity) {
            console.log("SUCCESS: Encryption/Decryption works!");
        } else {
            console.error("FAILED: Decrypted data does not match!");
        }
    } catch (error) {
        console.error("Encryption Test Failed:", error);
    }
}

async function main() {
    await testEncryption();
    // process.exit(0);
}

main();
