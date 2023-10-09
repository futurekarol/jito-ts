/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "trace_shred";

export interface TraceShred {
  /** source region, one of: https://jito-labs.gitbook.io/mev/systems/connecting/mainnet */
  region: string;
  /** timestamp of creation */
  createdAt:
    | Date
    | undefined;
  /** monotonically increases, resets upon service restart */
  seqNum: number;
}

function createBaseTraceShred(): TraceShred {
  return { region: "", createdAt: undefined, seqNum: 0 };
}

export const TraceShred = {
  encode(message: TraceShred, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.region !== "") {
      writer.uint32(10).string(message.region);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(18).fork()).ldelim();
    }
    if (message.seqNum !== 0) {
      writer.uint32(24).uint32(message.seqNum);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TraceShred {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTraceShred();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.region = reader.string();
          break;
        case 2:
          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 3:
          message.seqNum = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TraceShred {
    return {
      region: isSet(object.region) ? String(object.region) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      seqNum: isSet(object.seqNum) ? Number(object.seqNum) : 0,
    };
  },

  toJSON(message: TraceShred): unknown {
    const obj: any = {};
    message.region !== undefined && (obj.region = message.region);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.seqNum !== undefined && (obj.seqNum = Math.round(message.seqNum));
    return obj;
  },

  create<I extends Exact<DeepPartial<TraceShred>, I>>(base?: I): TraceShred {
    return TraceShred.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TraceShred>, I>>(object: I): TraceShred {
    const message = createBaseTraceShred();
    message.region = object.region ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.seqNum = object.seqNum ?? 0;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
