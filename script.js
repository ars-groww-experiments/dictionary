document.getElementById('searchButton').addEventListener('click', searchWord);
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchWord();
    }
});

async function searchWord() {
    const word = document.getElementById('searchInput').value.trim();
    const resultsDiv = document.getElementById('results');
    
    if (!word) {
        resultsDiv.innerHTML = '<p class="error">Please enter a word to search</p>';
        return;
    }

    try {
        const response = await fetch(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(word)}`, {
            headers: {
                'Accept': 'application/json'
            }
        });

        const data = await response.json();

        if (data.list.length === 0) {
            resultsDiv.innerHTML = '<p class="error">No definitions found for this word.</p>';
            return;
        }

        const definitions = data.list.map((def, index) => `
            <div class="definition">
                <h3>Definition ${index + 1}</h3>
                <p>${def.definition.replace(/[\[\]]/g, '')}</p>
                <div class="example">
                    <strong>Example:</strong><br>
                    ${def.example.replace(/[\[\]]/g, '')}
                </div>
                <div class="votes">
                    <span>👍 ${def.thumbs_up}</span>
                    <span>👎 ${def.thumbs_down}</span>
                </div>
            </div>
        `).join('');

        resultsDiv.innerHTML = definitions;

    } catch (error) {
        resultsDiv.innerHTML = '<p class="error">Error fetching definition. Please try again later.</p>';
        console.error('Error:', error);
    }
} 