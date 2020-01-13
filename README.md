# Rust Type Visualiser

Tired of straining your brain to parse error messages like these?

```
error[E0277]: the trait bound `&alloc::sync::Arc<sc_client::client::Client<sc_client_db::Backend<sp_runtime::generic::block::Block<sp_runtime::generic::header::Header<u32, sp_runtime::traits::BlakeTwo256>, sp_runtime::OpaqueExtrinsic>>, sc_client::call_executor::LocalCallExecutor<sc_client_db::Backend<sp_runtime::generic::block::Block<sp_runtime::generic::header::Header<u32, sp_runtime::traits::BlakeTwo256>, sp_runtime::OpaqueExtrinsic>>, sc_executor::native_executor::NativeExecutor<node_executor::Executor>>, sp_runtime::generic::block::Block<sp_runtime::generic::header::Header<u32,
sp_runtime::traits::BlakeTwo256>, sp_runtime::OpaqueExtrinsic>, node_runtime::RuntimeApi>>: sp_blockchain::backend::HeaderBackend<sp_runtime::generic::block::Block<sp_runtime::generic::header::Header<u32, sp_runtime::traits::BlakeTwo256>, sp_runtime::generic::unchecked_extrinsic::UncheckedExtrinsic<pallet_indices::address::Address<sp_core::crypto::AccountId32, u32>, node_runtime::Call, sp_runtime::MultiSignature, (frame_system::CheckVersion<node_runtime::Runtime>, frame_system::CheckGenesis<node_runtime::Runtime>, frame_system::CheckEra<node_runtime::Runtime>, frame_system::CheckNonce<node_runtime::Runtime>, frame_system::CheckWeight<node_runtime::Runtime>, pallet_transaction_payment::ChargeTransactionPayment<node_runtime::Runtime>, pallet_contracts::CheckBlockGasLimit<node_runtime::Runtime>)>>>` is not satisfied
```

Visualise and explore generic types structure here: https://tomusdrw.github.io/rust-type-visualiser
