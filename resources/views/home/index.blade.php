@extends('layouts.app')

@section('content')

    <script>
        const messageElement = document.getElementById('message');
        messageElement.focus();
        messageElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && ! event.shiftKey) {
                const numberOfLines = messageElement.value.split(/\r*\n/).length;
                if (numberOfLines >= 1 && messageElement.value.trim().length > 0) {
                    event.preventDefault();
                    document.getElementById('prompt-form').submit();
                }
            }
        });
    </script>
@endsection
