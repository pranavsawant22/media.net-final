// OpenAI utility functions for ad copy generation
export async function generateAdCopy(productDescription: string, objective: string): Promise<string[]> {
  try {
    const response = await fetch('/api/generate-ad-copy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productDescription,
        objective,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate ad copy: ${response.statusText}`);
    }

    const data = await response.json();
    return data.adCopies || [];
  } catch (error) {
    console.error('Error generating ad copy:', error);
    throw new Error('Failed to generate ad copy. Please try again.');
  }
}
