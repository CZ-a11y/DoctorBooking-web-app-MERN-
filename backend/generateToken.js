import { randomBytes } from "crypto";

// Configurable token generator with better error handling
function generateSecureToken({
  length = 32,
  encoding = "hex",
  purpose = "authentication",
} = {}) {
  try {
    // Validate length
    if (length < 16) {
      throw new Error("Token length too short - minimum 16 bytes recommended");
    }

    // Generate token
    const buffer = randomBytes(length);

    // Convert based on encoding
    let token;
    switch (encoding) {
      case "hex":
        token = buffer.toString("hex");
        break;
      case "base64":
        token = buffer.toString("base64");
        break;
      default:
        throw new Error(`Unsupported encoding: ${encoding}`);
    }

    console.log(`Generated ${purpose} token (${length} bytes)`);
    return token;
  } catch (error) {
    console.error("Token generation failed:", error.message);
    throw error; // Re-throw for calling code to handle
  }
}

// Example usage
const authToken = generateSecureToken({
  length: 32,
  purpose: "API authentication",
});

console.log("Secure Token:", authToken);
