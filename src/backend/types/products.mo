import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type Specification = { key : Text; value : Text };

  public type Product = {
    id : Common.ProductId;
    name : Text;
    description : Text;
    price : Nat;
    originalPrice : Nat;
    images : [Storage.ExternalBlob];
    category : Text;
    stock : Nat;
    rating : Float;
    reviewCount : Nat;
    specifications : [Specification];
    isFlashDeal : Bool;
    isTrending : Bool;
    tags : [Text];
    createdAt : Common.Timestamp;
  };

  public type ProductInput = {
    name : Text;
    description : Text;
    price : Nat;
    originalPrice : Nat;
    images : [Storage.ExternalBlob];
    category : Text;
    stock : Nat;
    specifications : [Specification];
    isFlashDeal : Bool;
    isTrending : Bool;
    tags : [Text];
  };

  public type Banner = {
    id : Nat;
    image : Storage.ExternalBlob;
    title : Text;
    subtitle : Text;
    linkUrl : Text;
    order : Nat;
    isActive : Bool;
  };

  public type BannerInput = {
    image : Storage.ExternalBlob;
    title : Text;
    subtitle : Text;
    linkUrl : Text;
    order : Nat;
    isActive : Bool;
  };
};
