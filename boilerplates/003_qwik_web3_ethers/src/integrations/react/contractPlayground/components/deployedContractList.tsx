/** @jsxRuntime automatic */
/** @jsxImportSource react */

import { ContractExtendedInfo } from '../ContractExtendedInfo'
import { ContractDetail_Lock } from './contractDetail_Lock'
import { DeployedContract } from './deployedContract'

export function DeployedContractList(props: { contracts: ContractExtendedInfo[] }) {
  return (
    <div>
      {props.contracts.map((item, index) => (
        <DeployedContract key={index} index={index} {...item}>
          {item.name == 'Lock' ? (
            <ContractDetail_Lock contract={item} />
          ) : (
            <div>Unsupported contract (interactions not available)</div>
          )}
        </DeployedContract>
      ))}
    </div>
  )
}
