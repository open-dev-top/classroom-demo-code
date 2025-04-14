import { create } from "zustand";

type Network = 'mainnet' | 'devnet' | 'testnet' | 'localnet';

interface Cluster {
  name: string;
  network: Network;
  endpoint: string;
}

const defaultClusters: Cluster[] = [
  { name: 'mainnet', network: 'mainnet', endpoint: 'https://api.mainnet-beta.solana.com' },
  {
    name: 'devnet',
    network: 'devnet',
    endpoint: 'https://api.devnet.solana.com',
  },
  {
    name: 'testnet',
    network: 'testnet',
    endpoint: 'https://api.testnet.solana.com',
  },
  {
    name: 'localnet',
    network: 'localnet',
    endpoint: 'http://localhost:8899',
  },
];

const useClustersStore = create<{
  clusters: Cluster[];
  addCluster: (cluster: Cluster) => void;
  switchCluster: (name: string) => void;
  removeCluster: (name: string) => void;
  activeCluster: Cluster | null;
}>((set) => ({
  clusters: defaultClusters,
  activeCluster: defaultClusters[0],
  addCluster: (cluster) => set((state) => ({ clusters: [...state.clusters, cluster] })),
  switchCluster: (name) => set((state) => ({ activeCluster: state.clusters.find((cluster) => cluster.name === name) })),
  removeCluster: (name) => set((state) => ({ clusters: state.clusters.filter((cluster) => cluster.name !== name) })),
}));

export default useClustersStore;