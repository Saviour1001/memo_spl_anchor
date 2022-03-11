const anchor = require("@project-serum/anchor");
const utf8 = require("utf8");
const emojiUnicode = require("emoji-unicode");
const assert = require("assert");
const bs58 = require("bs58");

describe("markTwo", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());
  const program = anchor.workspace.MarkTwo;

  it("Is initialized!", async () => {
    // Add your test here.
    const program = anchor.workspace.MarkTwo;
    const string = "letters";
    var codedString = Buffer.from(string);

    const tx = await program.rpc.buildMemo(codedString);
    console.log("Your transaction signature", tx);

    let emoji = Uint8Array.from(Buffer.from("🐆"));

    const tx2 = await program.rpc.buildMemo(Buffer.from("🐆"));
    console.log("Your transaction signature", tx2);

    console.log("Emoji", emoji);
    let bytes = Uint8Array.from([0xf0, 0x9f, 0x90, 0x86]);
    console.log("Bytes", bytes);
    assert.equal(emoji.toString(), bytes.toString());
  });

  it("Test 2", async () => {
    const pubkey1 = anchor.web3.Keypair.generate();
    const pubkey2 = anchor.web3.Keypair.generate();
    const pubkey3 = anchor.web3.Keypair.generate();

    const tx1 = await program.rpc.buildMemo(Buffer.from("🐆"), {
      accounts: [],
      remainingAccounts: [
        { pubkey: pubkey1.publicKey, isWritable: false, isSigner: true },
        { pubkey: pubkey2.publicKey, isWritable: false, isSigner: true },
        { pubkey: pubkey3.publicKey, isWritable: false, isSigner: true },
      ],
      signers: [pubkey1, pubkey2, pubkey3],
    });
    console.log(tx1);
    // const tx2 = await program.rpc.buildMemo(Buffer.from("🐆"), {
    //   accounts: [],
    //   remainingAccounts: [
    //     { pubkey: pubkey1.publicKey, isWritable: false, isSigner: false },
    //     { pubkey: pubkey2.publicKey, isWritable: false, isSigner: false },
    //     { pubkey: pubkey3.publicKey, isWritable: false, isSigner: false },
    //   ],
    // });
    // console.log(tx2);
  });
});
