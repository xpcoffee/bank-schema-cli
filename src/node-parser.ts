import * as readline from "readline";
import * as fs from "fs";
import {
  getStatementParser,
  getParseFn,
  ParseParams,
  Statement,
  deduplicateTransactions as dedupeFn,
} from "@xpcoffee/bank-schema-parser";

// This file is split off from the main parser file to avoid import issues when pulling
// the latter file into a non-node process.

/**
 * Parses a file given into a statement
 */
export function parseFromFile({
  fileType,
  filePath,
  deduplicateTransactions,
}: ParseFileParams): Promise<Statement> {
  const lines = getStatementLinesFromFile(filePath);
  const fn = getStatementParser(getParseFn(fileType), lines);
  const result = fn(filePath);
  return deduplicateTransactions ? result.then(dedupeFn) : result;
}
export interface ParseFileParams extends ParseParams {
  filePath: string;
}

/**
 * Reads a file and yields each line of the file
 */
export async function* getStatementLinesFromFile(filePath: string) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    yield line;
  }
}
