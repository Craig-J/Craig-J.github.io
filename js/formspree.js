$(document).ready(function() {
    $('#contact_form').validate({
        messages: { },
        submitHandler: function(form) {
        $.ajax({
            url: '//formspree.io/craigjeffrey3@gmail.com',
            method: 'POST',
            data: $(form).serialize(),
            dataType: 'json',
            beforeSend: function() {
                $contactForm.append('<div class="alert alert--loading">Sending message…</div>');
            },
            success: function(data) {
                $contactForm.append('<div class="alert alert--success">Message sent!</div>');
                setTimeout(function() {
                    $('.alert--success').remove();
                }, 5000);
            },
            error: function(err) {
                $contactForm.find('.alert--loading').hide();
                $contactForm.append('<div class="alert alert--error">Oops, there was an error.</div>');
                setTimeout(function() {
                    $('.alert--error').remove();
                }, 5000);
            }
        });
    })
});