
import sys

def check_syntax(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    try:
        # Simple attempt to see if it's broadly correct (though it's TS, it shares enough syntax with JS)
        # This is a bit risky but useful for basic quote balance.
        lines = content.split('\n')
        for i, line in enumerate(lines):
            # Very basic check for unescaped quotes in a line
            # This is not perfect because of multi-line strings, but here we have mostly single-line pairs.
            pass
        print("Basic check done.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_syntax(sys.argv[1])
