import { PublicKey } from '@solana/web3.js'
import BN from 'bn.js'
import { WithPoolPK, WithWallet } from '../pools/types'
import { PoolVersion } from '../types'

interface WithPoolVersion {
  poolVersion?: PoolVersion

}
export interface GetFarmingStateParams extends WithPoolPK, WithPoolVersion {
}

export interface GetFarmingTicketsParams {
  pool?: PublicKey
  userKey?: PublicKey
  poolVersion?: PoolVersion
}

export interface FarmingState {
  tokensUnlocked: BN
  tokensPerPeriod: BN
  tokensTotal: BN
  vestingType: number
  periodLength: number
  noWithdrawalTime: number
  vestingPeriod: number
  startTime: number
  currentTime: number
  pool: PublicKey
  farmingTokenVault: PublicKey
  farmingSnapshots: PublicKey
  farmingStatePublicKey: PublicKey
}

export interface StartFarmingCommons extends WithPoolPK {
  farmingState: PublicKey
  lpTokenFreezeVault: PublicKey
  lpTokenAccount: PublicKey
  tokenAmount: BN
}

export interface StartFarmingParams extends StartFarmingCommons, WithWallet, WithPoolVersion { }

export interface StartFarmingInstructionParams extends StartFarmingCommons {
  userKey: PublicKey
  farmingTicket: PublicKey
  programId: PublicKey
}

export interface AttachedFarmingState {
  farmingState: PublicKey
  lastWithdrawTime: number
  lastVestedWithdrawTime: number
}


export interface FarmingTicket {
  tokensFrozen: BN
  startTime: BN
  endTime: BN // Could be infinity
  userKey: PublicKey
  pool: PublicKey
  nextAttached: BN
  statesAttached: AttachedFarmingState[]
  farmingTicketPublicKey: PublicKey
}

export interface EndFarmingCommon extends WithPoolPK {
  farmingState: PublicKey
  farmingSnapshots: PublicKey
  farmingTicket: PublicKey
  lpTokenFreezeVault: PublicKey
  userPoolTokenAccount: PublicKey
}

export interface EndFarmingParams extends EndFarmingCommon, WithWallet, WithPoolVersion {

}

export interface EndFarmingInstructionParams extends EndFarmingCommon {
  userKey: PublicKey,
  poolSigner: PublicKey
  programId: PublicKey
}

export interface FarmingSnapshot {
  /**
   * LP tokens staked  
   * */

  tokensFrozen: BN

  /**
   * Total tokens (rewards) unlocked
   * */
  farmingTokens: BN

  time: number
}

export interface FarmingSnapshotQueue {
  snapshots: FarmingSnapshot[]
  nextIndex: BN
  queuePublicKey: PublicKey
}


export interface GetFarmingRewardParams {
  state: FarmingState
  queue: FarmingSnapshotQueue[]
  ticket: FarmingTicket
}

export interface ClaimFarmedCommons extends WithPoolPK {
  farmingState: PublicKey
  farmingSnapshots: PublicKey
  farmingTicket: PublicKey
  farmingTokenVault: PublicKey
}

export interface ClaimFarmedParams extends ClaimFarmedCommons, WithWallet, WithPoolVersion {
  userFarmingTokenAccount: PublicKey
  maxSnapshots: BN
}

export type GetFarmingSnapshotParams = WithPoolVersion

export interface ClaimFarmedInstructionParams extends ClaimFarmedCommons {
  userFarmingTokenAccount: PublicKey
  poolSigner: PublicKey
  userKey: PublicKey
  maxSnapshots: BN
  programId: PublicKey
}
