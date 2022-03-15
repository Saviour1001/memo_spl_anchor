const anchor = require("@project-serum/anchor");
const utf8 = require("utf8");
const emojiUnicode = require("emoji-unicode");
const assert = require("assert");
const bs58 = require("bs58");

describe("markTwo", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());
  const program = anchor.workspace.MarkTwo;

  it("Test 1 => Sending Buffers", async () => {
    const string = "letters";
    var codedString = Buffer.from(string);

    const tx = await program.rpc.buildMemo(codedString);
    console.log("Your transaction signature", tx);
  });

  it("Test 2 => Asserting Emojis and Bytes", async () => {
    let emoji = Uint8Array.from(Buffer.from("🐆"));

    const tx2 = await program.rpc.buildMemo(Buffer.from("🐆"));
    console.log("Your transaction signature", tx2);

    // console.log("Emoji", emoji);
    let bytes = Uint8Array.from([0xf0, 0x9f, 0x90, 0x86]);
    // console.log("Bytes", bytes);
    assert.equal(emoji.toString(), bytes.toString());
  });

  it("Test 3 => Sending Signed Transaction", async () => {
    const pubkey1 = anchor.web3.Keypair.generate();
    const pubkey2 = anchor.web3.Keypair.generate();
    const pubkey3 = anchor.web3.Keypair.generate();

    const tx = await program.rpc.buildMemo(Buffer.from("🐆"), {
      accounts: [],
      remainingAccounts: [
        { pubkey: pubkey1.publicKey, isWritable: false, isSigner: true },
        { pubkey: pubkey2.publicKey, isWritable: false, isSigner: true },
        { pubkey: pubkey3.publicKey, isWritable: false, isSigner: true },
      ],
      signers: [pubkey1, pubkey2, pubkey3],
    });
    console.log(tx);
  });

  // it("Test 4 => Sending Signed Transaction with a Memo", async () => {
  //   // This test should fail because the transaction is not signed.
  //   const pubkey1 = anchor.web3.Keypair.generate();
  //   const pubkey2 = anchor.web3.Keypair.generate();
  //   const pubkey3 = anchor.web3.Keypair.generate();
  //   const tx = await program.rpc.buildMemo(Buffer.from("🐆"), {
  //     accounts: [],
  //     remainingAccounts: [
  //       { pubkey: pubkey1.publicKey, isWritable: false, isSigner: false },
  //       { pubkey: pubkey2.publicKey, isWritable: false, isSigner: false },
  //       { pubkey: pubkey3.publicKey, isWritable: false, isSigner: false },
  //     ],
  //   });
  //   console.log(tx);
  // });

  // it("Test 5 => Sending Signed Transaction with a Memo", async () => {
  //   // This test should fail because the transaction is not signed.
  //   const pubkey1 = anchor.web3.Keypair.generate();
  //   const pubkey2 = anchor.web3.Keypair.generate();
  //   const pubkey3 = anchor.web3.Keypair.generate();
  //   const tx = await program.rpc.buildMemo(Buffer.from("🐆"), {
  //     accounts: [],
  //     remainingAccounts: [
  //       { pubkey: pubkey1.publicKey, isWritable: false, isSigner: true },
  //       { pubkey: pubkey2.publicKey, isWritable: false, isSigner: false },
  //       { pubkey: pubkey3.publicKey, isWritable: false, isSigner: true },
  //     ],
  //   });
  //   console.log(tx);
  // });
});
