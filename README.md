# Generate ISO-8601 timestamps for Deno using Rust/FFI

**NOTE**: This is a test project, not suitable to be used for anything except
testing.

The main use case of this project is to see whether we can speed up generating
ISO-8601 timestamp strings using a native library and how efficient different
FFI interface declarations will be (essentially, where are the bottlenecks).

## Benchmarks

This project includes a set of benchmarks with comparison to the basic
JavaScript forms of:

```javascript
// 1. generate an ISO-8601 string from given (static) milliseconds
new Date(millis).toISOString()

// 2. generate an ISO-8601 string for the current time
new Date().toISOString()
```

While the first merely tests the performance of the FFI interface overhead as
well as the performance of the underlying Rust library
[iso8601-timestamp](https://github.com/lantern-chat/iso8601-timestamp) for
generating a string for a given timestamp, the second includes the time for
retrieving the current time, which is quite significant.

Absolute results are mostly irrelevant, but the comparison shows where
bottlenecks exist:

```
$ make bench
cargo build --release
    Finished `release` profile [optimized] target(s) in 0.04s
deno bench --allow-ffi --allow-env bench.ts
    CPU | AMD Ryzen 7 5700G with Radeon Graphics
Runtime | Deno 1.46.3 (x86_64-unknown-linux-gnu)

file:///home/ancoron/dev/ancoron/deno-iso8601-rs/bench.ts

benchmark                                time/iter (avg)        iter/s      (min … max)           p75      p99     p995
---------------------------------------- ----------------------------- --------------------- --------------------------

group From Milliseconds
standard JavaScript (new Date(millis))          606.2 ns     1,650,000 (537.9 ns …   1.2 µs) 555.2 ns   1.2 µs   1.2 µs
FFI (bindgen; return String)                      1.5 µs       675,000 (  1.3 µs …   2.0 µs)   1.6 µs   2.0 µs   2.0 µs
FFI (bindgen; pass a buffer)                    769.0 ns     1,300,000 (473.6 ns …   1.3 µs) 868.0 ns   1.3 µs   1.3 µs
FFI (manual; return CString + free)             228.8 ns     4,370,000 (209.6 ns … 354.7 ns) 225.4 ns 342.7 ns 352.8 ns
FFI (manual; fill buffer with CString)            1.6 µs       641,600 (843.7 ns …   3.4 µs)   2.0 µs   3.4 µs   3.4 µs

summary
  standard JavaScript (new Date(millis))
     2.65x slower than FFI (manual; return CString + free)
     1.27x faster than FFI (bindgen; pass a buffer)
     2.44x faster than FFI (bindgen; return String)
     2.57x faster than FFI (manual; fill buffer with CString)

group Current Timestamp
standard JavaScript (new Date())                  2.1 µs       485,200 (  1.8 µs …   2.8 µs)   2.1 µs   2.8 µs   2.8 µs
FFI (bindgen; return String)                      2.8 µs       357,700 (  2.4 µs …   3.2 µs)   2.9 µs   3.2 µs   3.2 µs
FFI (bindgen; pass a buffer)                      3.3 µs       307,500 (  1.8 µs … 941.3 µs)   3.4 µs   4.7 µs   5.3 µs
FFI (manual; return CString + free)               1.5 µs       660,700 (  1.4 µs …   3.6 µs)   1.5 µs   3.6 µs   3.6 µs
FFI (manual; fill buffer with CString)            3.1 µs       326,700 (  2.3 µs …   5.2 µs)   3.6 µs   5.2 µs   5.2 µs

summary
  standard JavaScript (new Date())
     1.36x slower than FFI (manual; return CString + free)
     1.36x faster than FFI (bindgen; return String)
     1.49x faster than FFI (manual; fill buffer with CString)
     1.58x faster than FFI (bindgen; pass a buffer)

```

## Contributing

Contributions are welcome on any area (within the scope/use-case of this
project).
