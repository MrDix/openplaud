/**
 * Storage provider interface
 * Abstracts local filesystem and S3-compatible storage
 */
export interface StorageProvider {
    /**
     * Upload a file to storage
     * @param key - The storage key/path
     * @param buffer - File data as Buffer
     * @param contentType - MIME type of the file
     * @returns The storage path/key
     */
    uploadFile(
        key: string,
        buffer: Buffer,
        contentType: string,
    ): Promise<string>;

    /**
     * Download a file from storage
     * @param key - The storage key/path
     * @returns File data as Buffer
     */
    downloadFile(key: string): Promise<Buffer>;

    /**
     * Get a signed/temporary URL for file access
     * @param key - The storage key/path
     * @param expiresIn - Expiry time in seconds
     * @returns Signed URL or local file path
     */
    getSignedUrl(key: string, expiresIn: number): Promise<string>;

    /**
     * Delete a file from storage
     * @param key - The storage key/path
     */
    deleteFile(key: string): Promise<void>;

    /**
     * Test storage connection
     * @returns True if connection is successful
     */
    testConnection(): Promise<boolean>;
}

/**
 * S3 configuration
 */
export interface S3Config {
    endpoint?: string; // Optional for non-AWS S3-compatible services
    bucket: string;
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
}

/**
 * Storage type
 */
export type StorageType = "local" | "s3";
