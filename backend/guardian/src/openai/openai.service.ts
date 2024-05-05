import { Injectable, Body } from '@nestjs/common';
import dotenv from 'dotenv';
import FormData from 'form-data';
import fetch from 'node-fetch';
import createNFTDto from "./creat-nft.dto";
import {Client, NFTokenMintFlags, Wallet} from 'xrpl';

dotenv.config;

@Injectable()
export class OpenaiService {
  responseData: any;
  get_openai_image() {}

  JWT: string = process.env.PINATA_JWT!;

  pinFileToIPFS = async (data: any): Promise<string | undefined> => {
    const formData = new FormData();
    const jsonData: string = JSON.stringify(data);
    const jsonBuffer: Buffer = Buffer.from(jsonData, 'utf-8');

    // Append the Buffer as a file to FormData
    formData.append('file', jsonBuffer, 'Test.json');

    formData.append(
      'pinataOptions',
      JSON.stringify({
        cidVersion: 0,
      }),
    );

    // Setting headers, include FormData's headers to handle the boundary
    const headers: HeadersInit = {
      Authorization: `Bearer ${this.JWT}`,
      ...formData.getHeaders(),
    };

    try {
      // Send the POST request
      const response = await fetch(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        {
          method: 'POST',
          body: formData,
          headers: headers,
        },
      );
        const responseData = await response.json();
        console.log(responseData);
        return this.responseData.IpfsHash;
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

  fetchFileFromIPFS = async (ipfsHash: string): Promise<any | undefined> => {
    const url: string = `https://crimson-active-cuckoo-676.mypinata.cloud/ipfs/${ipfsHash}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
      console.log('Fetched from IPFS:', data);
      return data;
    } catch (error) {
      console.error('Error fetching file from IPFS:', error);
      return undefined;
    }
  };

  async mintNFT(
    createNFTDto: createNFTDto,
    flags: number,
    tokenTaxon: number,
    wallet: Wallet,
  ) {
    const client = new Client("wss://s.altnet.rippletest.net:51233");

    const transactionJson = {
      TransactionType: 'NFTokenMint',
      Account: wallet.address,
      Flags: NFTokenMintFlags,
      NFTokenTaxon: tokenTaxon,
      URI: createNFTDto,
    }
    const tx = await client.submitAndWait(transactionJson);
    return tx
  }

  async createNFTFromImage(@Body() createNFTDto: createNFTDto, wallet: Wallet) {
    this.mintNFT(createNFTDto, lsfOnlyXRP, 1, wallet);
  }
}
