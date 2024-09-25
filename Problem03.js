interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
  }
  interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
  }
  
  interface Props extends BoxProps {}
  
  const getPriority = (blockchain: string): number => {
    const priorities: { [key: string]: number } = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };
    return priorities[blockchain] ?? -99;
  };
  
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();
  
    // Filter and sort balances using memoization
    const filteredSortedBalances = useMemo(() => {
      return balances
        .filter((balance: WalletBalance) => {
          const priority = getPriority(balance.blockchain);
          return priority > -99 && balance.amount > 0;
        })
        .sort((lhs: WalletBalance, rhs: WalletBalance) => {
          return getPriority(rhs.blockchain) - getPriority(lhs.blockchain);
        });
    }, [balances]);
  
    // Format balances with memoization to avoid unnecessary calculations
    const formattedBalances = useMemo(() => {
      return filteredSortedBalances.map((balance: WalletBalance) => ({
        ...balance,
        formatted: balance.amount.toFixed(),
      }));
    }, [filteredSortedBalances]);
  
    // Memoize rows to avoid recalculations during re-renders
    const rows = useMemo(() => {
      return formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
          <WalletRow
            className={classes.row}
            key={index}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      });
    }, [formattedBalances, prices]);
  
    return <div {...rest}>{rows}</div>;
  };
  