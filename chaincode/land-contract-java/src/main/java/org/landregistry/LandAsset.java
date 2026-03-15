package org.landregistry;

import org.hyperledger.fabric.contract.annotation.DataType;
import org.hyperledger.fabric.contract.annotation.Property;
import com.owlike.genson.annotation.JsonProperty;
import java.util.Objects;

@DataType()
public final class LandAsset {

    // --- IMMUTABLE ANCHOR FIELDS ---
    // These define the physical and historical reality of the land and should never change once minted.

    @Property()
    private final String ulpin; // Primary Key: Unique Land Parcel Identification Number [cite: 6, 7]

    @Property()
    private final String gpsCoordinates; // Mathematical anchor resolving the oracle problem

    @Property()
    private final String parentUlpin; // Lineage tracking for mutations (null if root asset)

    // --- MUTABLE STATE FIELDS ---
    // These represent the current legal and operational state on the ledger.

    @Property()
    private String currentOwnerId; // Replaced ownerAadhaarHash to align with Seller ID / Buyer ID workflow [cite: 59, 60]

    @Property()
    private String documentHash; // SHA-256 Hash or IPFS CID of the actual PDF deed [cite: 44, 46, 61]

    @Property()
    private String status; // e.g., "ACTIVE", "PENDING_TRANSFER", "RETIRED_MUTATED"

    public LandAsset(@JsonProperty("ulpin") final String ulpin,
                     @JsonProperty("gpsCoordinates") final String gpsCoordinates,
                     @JsonProperty("parentUlpin") final String parentUlpin,
                     @JsonProperty("currentOwnerId") final String currentOwnerId,
                     @JsonProperty("documentHash") final String documentHash,
                     @JsonProperty("status") final String status) {
        this.ulpin = ulpin;
        this.gpsCoordinates = gpsCoordinates;
        this.parentUlpin = parentUlpin;
        this.currentOwnerId = currentOwnerId;
        this.documentHash = documentHash;
        this.status = status;
    }

    // --- Getters (For all fields) ---
    public String getUlpin() { return ulpin; }
    public String getGpsCoordinates() { return gpsCoordinates; }
    public String getParentUlpin() { return parentUlpin; }
    public String getCurrentOwnerId() { return currentOwnerId; }
    public String getDocumentHash() { return documentHash; }
    public String getStatus() { return status; }

    // --- Setters (Strictly for mutable state fields only) ---
    public void setCurrentOwnerId(String currentOwnerId) { 
        this.currentOwnerId = currentOwnerId; 
    }
    
    public void setDocumentHash(String documentHash) { 
        this.documentHash = documentHash; 
    }
    
    public void setStatus(String status) { 
        this.status = status; 
    }

    @Override
    public boolean equals(final Object obj) {
        if (this == obj) return true;
        if ((obj == null) || (getClass() != obj.getClass())) return false;
        LandAsset other = (LandAsset) obj;
        return Objects.equals(getUlpin(), other.getUlpin())
                && Objects.equals(getGpsCoordinates(), other.getGpsCoordinates())
                && Objects.equals(getParentUlpin(), other.getParentUlpin())
                && Objects.equals(getCurrentOwnerId(), other.getCurrentOwnerId())
                && Objects.equals(getDocumentHash(), other.getDocumentHash())
                && Objects.equals(getStatus(), other.getStatus());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUlpin(), getGpsCoordinates(), getParentUlpin(), getCurrentOwnerId(), getDocumentHash(), getStatus());
    }

    @Override
    public String toString() {
        return this.getClass().getSimpleName() + "@" + Integer.toHexString(hashCode()) 
            + " [ulpin=" + ulpin + ", currentOwnerId=" + currentOwnerId + ", status=" + status + "]";
    }
}