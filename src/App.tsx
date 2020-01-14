import React, {useState} from 'react';
import Tooltip from 'rc-tooltip';
import './App.css';
import 'rc-tooltip/assets/bootstrap_white.css';

import { parse, Type } from './parse';

const example = `
error[E0277]: the trait bound \`&alloc::sync::Arc<sc_client::client::Client<sc_client_db::Backend<sp_runtime::generic::block::Block<sp_runtime::generic::header::Header<u32, sp_runtime::traits::BlakeTwo256>, sp_runtime::OpaqueExtrinsic>>, sc_client::call_executor::LocalCallExecutor<sc_client_db::Backend<sp_runtime::generic::block::Block<sp_runtime::generic::header::Header<u32, sp_runtime::traits::BlakeTwo256>, sp_runtime::OpaqueExtrinsic>>, sc_executor::native_executor::NativeExecutor<node_executor::Executor>>, sp_runtime::generic::block::Block<sp_runtime::generic::header::Header<u32,
sp_runtime::traits::BlakeTwo256>, sp_runtime::OpaqueExtrinsic>, node_runtime::RuntimeApi>>: sp_blockchain::backend::HeaderBackend<sp_runtime::generic::block::Block<sp_runtime::generic::header::Header<u32, sp_runtime::traits::BlakeTwo256>, sp_runtime::generic::unchecked_extrinsic::UncheckedExtrinsic<pallet_indices::address::Address<sp_core::crypto::AccountId32, u32>, node_runtime::Call, sp_runtime::MultiSignature, (frame_system::CheckVersion<node_runtime::Runtime>, frame_system::CheckGenesis<node_runtime::Runtime>, frame_system::CheckEra<node_runtime::Runtime>, frame_system::CheckNonce<node_runtime::Runtime>, frame_system::CheckWeight<node_runtime::Runtime>, pallet_transaction_payment::ChargeTransactionPayment<node_runtime::Runtime>, pallet_contracts::CheckBlockGasLimit<node_runtime::Runtime>)>>>\` is not satisfied
`;

const App: React.FC = () => {
  const [input, setInput] = useState(example);
  const [error, setError] = useState('');
  const [result, setResult] = useState(parse(input));

  function onChange(val: string) {
    setInput(val);
    try {
      const res = parse(val);
      console.dir(res);
      setError('');
      setResult(res);
    } catch (e) {
      console.error(e);
      setError(e.toString());
    }
  }

  return (
    <div className="App">
      <div className="input">
        <div className="block">
          <textarea
            onChange={ev => onChange(ev.target.value)}
            value={input}
          />
        </div>
        <div className="block">
          { error && <h1 className="error">{error}</h1> }
          { !error && <FlatTypes flat={result.flat} /> }
        </div>
      </div>
      <div className="output">
        <div className="block">
          { !error && <TypeExplorer roots={result.roots} /> }
        </div>
      </div>
    </div>
  );
}

function FlatTypes({ flat }: { flat: { [key:string]: Type } }) {
  const types = Object.values(flat);
  types.sort((a, b) => {
    const as = a.toString();
    const bs = b.toString();
    if (as < bs) {
      return -1;
    }
    if (as > bs) {
      return 1;
    } 
    return 0;
  });

  return (
    <>
      <h3>All types</h3>
      <ul>
      {
        types.map(type => (
          <li key={type.toString()}>
            <DisplayType type={type} />
          </li>
        ))
      }
      </ul>
    </>
  );
}

function TypeExplorer({ roots }: { roots: Type[] }) {
  return (
    <ul>
      {
        roots.map(type => (
          <li key={type.toString()}>
            <DisplayType type={type} expand={true} />
          </li>
        ))
      }
    </ul>
  );
}

function DisplayType({ type, expand }: { type: Type, expand?: boolean }) {
  const [folded, setFolded] = useState(type.isTuple() ? true : !expand);
  const shortName = type.getShortName();
  const toggleFolded = () => setFolded(!folded);
  let name;
  if (type.args.length === 0) {
    name = (
      <span
        style={{backgroundColor: type.getColor()}}
      >{ shortName }</span>
    )
  } else {
    name = (
      <a 
        href="#"
        onClick={toggleFolded}
        style={{backgroundColor: type.getColor()}}
      >{ shortName }</a>
    )
  }

  return (
    <div
      className="type"
    >
      <Tooltip
        placement="top"
        overlay={expand ? type.getScopedName() : type.toString() }
        trigger={expand ? 'hover' : 'click'}
      >
        { name }
      </Tooltip>

      { type.args.length > 0 && (
        <ul style={{display: folded ? 'none' : 'block' }}>
          {
            type.args.map(type => (
              <li key={type.toString()}><DisplayType type={type} expand={expand} /></li>
            ))
          }
        </ul>
      )}
    </div>
  )
}

export default App;
