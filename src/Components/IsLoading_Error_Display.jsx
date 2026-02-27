export default function IsLoading_Error_Display({ loading, error, refetchCrypto }) {
  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading market data...</div>;
  }


  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>
        Error loading crypto data: {error}
        <button onClick={refetchCrypto} style={{ marginTop: '20px' }}>
          Try Again
        </button>
      </div>
    );
  }
}